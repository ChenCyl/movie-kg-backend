module.exports = class CreateUserQuery {
  constructor(userId, userDetails) {
    this.details = {
      userId: userId,
      userDetails // name label
    }
  }

  parameter() {
    return this.details;
  }

  get() {
    return `merge (user:User {id:${this.details.userId}})
    on create set user:${this.details.userDetails.label}
              set user.name = ${this.details.userDetails.name}         
    return user{.*}`
  }

  transform(record) {
    return record.get('user')
  }
}