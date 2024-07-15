import { PermissionDTO } from "../../../../../generated";
import { groupPermissions } from "./AclTable";

describe("groupPermissions", () => {
  it("should ignore non-crud actions and badly formatted permission names", () => {
    const nonCrud: PermissionDTO[] = [
      { id: 1, name: "foo.bar", description: "a", userGroupIds: [] },
      { id: 2, name: "hello world", description: "a", userGroupIds: [] },
    ];
    expect(groupPermissions(nonCrud).size).toBe(0);
  });

  it("should handle multipleh keys", () => {
    const ward: PermissionDTO = {
      id: 1,
      name: "ward.read",
      description: "read ward",
      userGroupIds: [],
    };
    const opd: PermissionDTO = {
      id: 2,
      name: "opd.create",
      description: "create an opd",
      userGroupIds: [],
    };
    const mixedPermissions: PermissionDTO[] = [ward, opd];
    const someGroupedPermissions = groupPermissions(mixedPermissions);

    expect(someGroupedPermissions.size).toBe(2);
    expect(someGroupedPermissions.get("ward")).toEqual({ read: ward });
    expect(someGroupedPermissions.get("opd")).toEqual({ create: opd });
  });

  it("should handle multiple actions", () => {
    const ward: PermissionDTO[] = [
      { id: 1, name: "ward.read", description: "read ward", userGroupIds: [] },
      {
        id: 2,
        name: "ward.create",
        description: "create ward",
        userGroupIds: [],
      },
    ];
    const wardPermissions = groupPermissions(ward);
    expect(wardPermissions.size).toBe(1);
    expect(wardPermissions.get("ward")).toEqual({
      read: ward[0],
      create: ward[1],
    });
  });

  it("should throw on duplicate", () => {
    const doublePermissions: PermissionDTO[] = [
      { id: 1, name: "ward.read", description: "read ward", userGroupIds: [] },
      { id: 1, name: "ward.read", description: "read ward", userGroupIds: [] },
    ];
    expect(() => groupPermissions(doublePermissions)).toThrow();
  });
});
