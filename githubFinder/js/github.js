class Github {
  constructor() {
    this.client_id = 'ec38dc2f2fd63b9915ef';
    this.client_secret = '24e11b6b4930a7e0b275eacbbbc940d0c590da40';
  }

   async getUsers(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile= await profileResponse.json();

    return {
      profile
    } ;

  }
}