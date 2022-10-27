const stringToBool = (string: string) => {
  if (string === 'false') {
    return false;
  }
  if (string === 'true') {
    return true;
  }
};

const inProgressFilter = (matches: any, progress: string) => {
  const progresBoolefy = stringToBool(progress); // transforma query true ou false, que é uma string em booleano;
  const progressFilter = matches.filter((m: any) => m.inProgress === progresBoolefy);

  return progressFilter;
};

export default inProgressFilter;
