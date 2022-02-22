export const evaluateEnvVar = (envVar: string | undefined): boolean => {
  if (envVar === undefined || envVar.toLowerCase() === "false") {
    return false;
  }

  if (envVar.toLowerCase() === "true") {
    return true;
  }

  console.warn(
    `Feature flag variable, if set, should be "true" or "false", given ${envVar}`
  );
  return false;
};
