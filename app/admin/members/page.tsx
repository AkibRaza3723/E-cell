import React from "react";
import { requireAdminSession } from "@/lib/admin-auth";
import { getMembersList } from "@/lib/actions/members-actions";
import { MembersManager } from "@/components/admin/members-manager";

export default async function AdminMembersPage() {
  await requireAdminSession();
  const members = await getMembersList();

  return <MembersManager initialMembers={members} />;
}
