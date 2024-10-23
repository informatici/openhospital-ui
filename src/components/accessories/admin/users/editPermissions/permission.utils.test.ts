import { PermissionDTO } from "../../../../../generated";
import { permissionsToCrud } from "./permission.utils";

describe("permissionsToCrud", () => {
  it("should ignore non-crud actions and badly formatted permission names", () => {
    const nonCrud: PermissionDTO[] = [
      { id: 1, name: "foo.bar", description: "a" },
      { id: 2, name: "hello world", description: "a" },
    ];
    expect(permissionsToCrud(nonCrud).size).toBe(0);
  });

  it("should handle multipleh keys", () => {
    const ward: PermissionDTO = {
      id: 1,
      name: "ward.read",
      description: "read ward",
    };
    const opd: PermissionDTO = {
      id: 2,
      name: "opd.create",
      description: "create an opd",
    };
    const mixedPermissions: PermissionDTO[] = [ward, opd];
    const someGroupedPermissions = permissionsToCrud(mixedPermissions);

    expect(someGroupedPermissions.size).toBe(2);
    expect(someGroupedPermissions.get("ward")).toEqual({ read: ward });
    expect(someGroupedPermissions.get("opd")).toEqual({ create: opd });
  });

  it("should handle multiple actions", () => {
    const ward: PermissionDTO[] = [
      { id: 1, name: "ward.read", description: "read ward" },
      {
        id: 2,
        name: "ward.create",
        description: "create ward",
        // ,
      },
    ];
    const wardPermissions = permissionsToCrud(ward);
    expect(wardPermissions.size).toBe(1);
    expect(wardPermissions.get("ward")).toEqual({
      read: ward[0],
      create: ward[1],
    });
  });

  it("should throw on duplicate", () => {
    const doublePermissions: PermissionDTO[] = [
      { id: 1, name: "ward.read", description: "read ward" },
      { id: 1, name: "ward.read", description: "read ward" },
    ];
    expect(() => permissionsToCrud(doublePermissions)).toThrow();
  });
});

