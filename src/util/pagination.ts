export const buildPaginationResponse = ({
  offset,
  limit,
  total,
}: {
  offset: number;
  limit: number;
  total: number;
}) => {
  return {
    offset,
    limit,
    total,
  };
};
