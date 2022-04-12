export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent
        }
    }
  
    setUserInfo(name, job, avatar) {
        this._userName.textContent = name,
        this._userJob.textContent = job,
        this._avatar.src = avatar
    }
}