export const parseMineType = (filename: string): string => {
  const extension = filename.split('.').pop();
  switch (extension) {
    case 'png':
      return 'image/png';
    case 'jpg':
      return 'image/jpg';
    case 'jpeg':
      return 'image/jpeg';
    default:
      return 'image/png';
  }
};
