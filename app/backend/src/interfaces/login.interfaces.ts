type User = {
  id: number,
  username: string,
  role: string,
  email: string
};

export default interface ILoginUser {
  user: User,
  token: string,
}
