const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { NovastageSDK } = require('../ts/dist/NovastageSDK.js');

let step = 'authentication';
let createdId = null;
let originalIds = new Set();

function makeClient(cookie = '') {
  return new NovastageSDK({
    base: 'https://novastage.app',
    apikey: cookie,
    system: {
      fetch: async (url, options) => {
        const address = new URL(url);
        assert.equal(address.origin, 'https://novastage.app');

        if (address.pathname.endsWith('/delete')) {
          const body = JSON.parse(options.body);
          assert.ok(createdId);
          assert.equal(body.projectId, createdId);
          assert.ok(!originalIds.has(createdId));
        }

        const response = await fetch(url, {
          ...options,
          redirect: 'error',
          signal: AbortSignal.timeout(15000)
        });

        console.log(`${step}: HTTP ${response.status}`);

        // Remember the new ID even if SDK response processing fails.
        if (
          options.method === 'POST' &&
          address.pathname === '/api/dashboard/projects' &&
          response.ok
        ) {
          const body = await response.clone().json();
          assert.equal(typeof body.project.id, 'string');
          assert.ok(!originalIds.has(body.project.id));
          createdId = body.project.id;
        }

        return response;
      }
    }
  });
}

async function expectError(label, operation, status) {
  step = label;
  await assert.rejects(operation, {
    code: 'request_status',
    status: status
  });
  console.log(`PASS ${label}`);
}

async function main() {
  const cookie = process.env.NOVASTAGE_SESSION_COOKIE;
  assert.ok(cookie, 'NOVASTAGE_SESSION_COOKIE is required');

  await expectError(
    'missing session',
    () => makeClient().AccountSetting().load(),
    401
  );

  const client = makeClient(cookie);

  step = 'getAccountSettings';
  const settings = await client.AccountSetting().load();
  assert.equal(typeof settings.data().email, 'string');

  step = 'listProjects';
  const projects = await client.Project().list();
  originalIds = new Set(projects.map(project => project.data().id));

  const name = `SDK Smoke ${new Date().toISOString()} ${randomUUID().slice(0, 8)}`;
  console.log(`Test project: ${name}`);

  try {
    await expectError(
      'empty name',
      () => client.Project().create({ name: '' }),
      400
    );
    await expectError(
      'name longer than 80 characters',
      () => client.Project().create({ name: 'x'.repeat(81) }),
      400
    );
    await expectError(
      'invalid project ID',
      () => client.Member().list({ project_id: 'not-a-uuid' }),
      400
    );
    await expectError(
      'nonexistent project ID',
      () => client.Member().list({ project_id: randomUUID() }),
      400
    );

    step = 'createProject';
    const project = await client.Project().create({ name });
    assert.equal(project.data().id, createdId);
    assert.equal(project.data().name, name);

    step = 'listProjectMembers';
    const members = await client.Member().list({ project_id: createdId });
    assert.ok(members.some(member => member.data().role === 'owner'));
  } catch (error) {
    error.check = step;
    throw error;
  } finally {
    if (createdId) {
      step = 'deleteProject';
      const result = await client.MessageResult().create({
        projectId: createdId
      });
      assert.equal(result.data().success, true);

      step = 'verify cleanup';
      const projectsAfter = await client.Project().list();
      const remainingIds = new Set(
        projectsAfter.map(project => project.data().id)
      );
      assert.ok(!remainingIds.has(createdId));
      assert.ok([...originalIds].every(id => remainingIds.has(id)));
      console.log('PASS cleanup; existing projects retained');
    }
  }

  console.log('PASS all five operations and error checks');
}

main().catch(error => {
  console.error('FAIL: ' + (error.check || step));
  console.error(
    'Code: ' + (error.code || 'CHECK_FAILED') +
    '; status: ' + (error.status || -1)
  );
  process.exitCode = 1;
});