export const unwrap = (res) => {
  if (!res.data.success) {
    throw new Error(res.data.error || res.data.message);
  }
  return res.data.data;
};
