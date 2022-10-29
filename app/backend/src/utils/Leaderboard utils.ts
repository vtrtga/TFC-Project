const matchesThatInProgressIsFalse = async (allMatches: any) => {
  const filteredMatches = (await allMatches).filter((m: any) => m.inProgress === false);

  return filteredMatches;
};

export default matchesThatInProgressIsFalse;
