type User = {
  id: number,
  username: string,
  role: string,
  emailUser: string
};

export default interface ILoginUser {
  user: User,
  token: string,
}
