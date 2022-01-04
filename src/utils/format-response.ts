export const formatResponse = (res: any, result: any) => {
  if (result?.response?.data?.status >= 400) {
    res.status(result?.response?.data?.status).send(result?.response?.message)
  } else if (result?.response?.status >= 400) {
    res.status(result?.response?.status).send(result?.response?.data?.errors?.length ? result?.response?.data?.errors[0] : result?.response?.message)
    // res.send(result?.response?.data?.errors[0])
  } else {
    res.send(result)
  }
}
