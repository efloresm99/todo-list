/**
 * Get ids that were not found in database
 * @param sentIdsList The ids sent from the client. (This list contains non existing ids)
 * @param foundIdsList The ids that were found in the database
 * @returns Array of ids that were not found in database.
 */
export const getNotFoundIds = <T>(sentIdsList: T[], foundIdsList: T[]): T[] => {
  return sentIdsList.filter((id) => !foundIdsList.includes(id));
};
