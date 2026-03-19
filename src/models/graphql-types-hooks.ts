interface Shift {
  sNom: string;
  sPrenom?: string | null;
  sFonction: string;
  sBureau?: string | null;
  sTelephone?: string | null;
  sPortable?: string | null;
  sProfessionnel?: string | null;
}

interface GetShiftsQueryVariables {
  date: string;
}

interface GetShiftsQueryResult {
  data?: { shifts: Shift[] };
  isLoading: boolean;
  isError: boolean;
}

export const useGetShiftsQuery = (
  _variables: GetShiftsQueryVariables,
): GetShiftsQueryResult => {
  return { data: undefined, isLoading: false, isError: false };
};
