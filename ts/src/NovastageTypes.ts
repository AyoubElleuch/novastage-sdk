// Typed models for the Novastage SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AccountSetting {
  email: string
  profile: Record<string, any>
}

export interface AccountSettingLoadMatch {
  email?: string
  profile?: Record<string, any>
}

export interface Member {
  avatarUrl?: string
  email?: string
  fullName?: string
  joinedAt?: string
  role: string
  userId: string
  username?: string
}

export interface MemberListMatch {
  project_id: string
}

export interface MessageResult {
  message: string
  projectId: string
  success: boolean
}

export interface MessageResultCreateData {
  message: string
  projectId: string
  success: boolean
}

export interface Project {
  createdAt?: string
  description?: string
  id: string
  inviteCode?: string
  maxMembers?: number
  memberList?: any[]
  members: number
  name: string
  pendingRequestsCount?: number
  role?: string
  slug: string
  updatedAt: string
}

export interface ProjectListMatch {
  createdAt?: string
  description?: string
  id?: string
  inviteCode?: string
  maxMembers?: number
  memberList?: any[]
  members?: number
  name?: string
  pendingRequestsCount?: number
  role?: string
  slug?: string
  updatedAt?: string
}

export interface ProjectCreateData {
  createdAt?: string
  description?: string
  id: string
  inviteCode?: string
  maxMembers?: number
  memberList?: any[]
  members: number
  name: string
  pendingRequestsCount?: number
  role?: string
  slug: string
  updatedAt: string
}

