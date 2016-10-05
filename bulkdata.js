var models = require("./models/models.js");

models.User.bulkCreate([
      {id:1, email:1, password:"$2a$10$VzHzSwBvgfDmPDZbDSMzJeqI7zP1Ktz9KwZZRvpxhqb7e5JfAcU6K",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:2, email:2, password:"$2a$10$XEot/PoEX/w.wWS3d6zQDeqz2LwpPLXOXyeOMZGGcmHT.knUWKqSG",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:3, email:3, password:"$2a$10$AUWPkehEk8RrCxvzz/ZJ7ebawLXTd5mIwJY77aMotjKTnEmqRxota",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:4, email:4, password:"$2a$10$GlAdHmjLbDVf1EonTDZxheCPVkVjEIhqjlm2vNpHcHUjYUpCwmQgC",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
        
        {id:5, email:5, password:"$2a$10$F.z39S.yi0UhrZO2Sj3gceROs40zxd/S//Ae3gdYnePazZ/OkSTDC",
        firstname:1, lastname:1, match:1, age:22, city:"Liberty City",
        upper:40, lower:20, seeking:"M", gender:"M", createdAt:"2016-09-24 19:08:35", updatedAt:"2016-09-24 19:08:35"},
      ]);

models.Answer.bulkCreate([
{id:1, UserId:1, a091201:1, a091202:1, a091203:1, a091204:1, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:2, UserId:2, a091201:2, a091202:2, a091203:2, a091204:2, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:3, UserId:3, a091201:3, a091202:3, a091203:3, a091204:3, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:4, UserId:4, a091201:4, a091202:4, a091203:4, a091204:4, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},
{id:5, UserId:5, a091201:5, a091202:5, a091203:5, a091204:5, createdAt:"2016-09-24 19:08:35" , updatedAt:"2016-09-24 19:08:35"},

])

  models.Matched.bulkCreate([
    {id:1, chat:0, user1:2, user2:4, yes:1,  no:1, search:"OK", answered:0, avg:50, createdAt:"2016-09-27 00:35:04", updatedAt:"2016-09-27 00:35:04"}
    ])

  models.Vote.bulkCreate([
    {id:1, vote:1, UserId:1, MatchedId:1, createdAt:"2016-09-27 00:35:04", updatedAt:"2016-09-27 00:35:04"},
    {id:2, vote:0, UserId:3, MatchedId:1, createdAt:"2016-09-27 00:35:04", updatedAt:"2016-09-27 00:35:04"}
    ])
  