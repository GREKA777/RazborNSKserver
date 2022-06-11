const sequelize = require("../db")
const {DataTypes} = require("sequelize")

//allowNull - может ли быть равно ничему
//unique - должно ли быть уникальным
//defaultValue - дефолтное значение


//БД
const Feedback = sequelize.define("feedback", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false}
})

const Connect = sequelize.define("connect", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    topic: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false}
})

const Orders = sequelize.define("orders", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FIO: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    phone: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"},
    img: {type: DataTypes.STRING}
})

const Favourite = sequelize.define("favourite", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const History = sequelize.define("history", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const OrderData = sequelize.define("orderData", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    num: {type: DataTypes.STRING, allowNull: false, unique: true},
    status: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const Type = sequelize.define("type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const Delivery = sequelize.define("delivery", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const Favourite_All = sequelize.define("favouriteAll", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Basket_All = sequelize.define("basketAll", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const History_All = sequelize.define("historyAll", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Tiers = sequelize.define("tiers", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    num: {type: DataTypes.STRING, allowNull: false, unique: true},
    width: {type: DataTypes.INTEGER, allowNull: false},
    profile: {type: DataTypes.INTEGER, allowNull: false},
    diameter: {type: DataTypes.INTEGER, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false, unique: true},
    price: {type: DataTypes.INTEGER, allowNull: false}
})

const AutoPart = sequelize.define("autopart", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    num: {type: DataTypes.STRING, allowNull: false, unique: true},
    year: {type: DataTypes.INTEGER},
    car: {type: DataTypes.STRING},
    engine: {type: DataTypes.STRING},
    run: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false, unique: true}
})

//связи
User.hasOne(Feedback)
Feedback.belongsTo(User)

User.hasMany(Connect)
Connect.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User)

OrderData.hasMany(Orders)
Orders.belongsTo(OrderData)

User.hasOne(Favourite)
Favourite.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(History)
History.belongsTo(User)

User.hasOne(OrderData)
OrderData.belongsTo(User)

Favourite.hasMany(Favourite_All)
Favourite_All.belongsTo(Favourite)

Basket.hasMany(Basket_All)
Basket_All.belongsTo(Basket)

History.hasMany(History_All)
History_All.belongsTo(History)

Tiers.hasMany(OrderData)
OrderData.belongsTo(Tiers)

AutoPart.hasMany(OrderData)
OrderData.belongsTo(AutoPart)

Delivery.hasMany(OrderData)
OrderData.belongsTo(Delivery)

Tiers.hasOne(Favourite_All)
Favourite_All.belongsTo(Tiers)

AutoPart.hasOne(Favourite_All)
Favourite_All.belongsTo(AutoPart)

Tiers.hasOne(Basket_All)
Basket_All.belongsTo(Tiers)

AutoPart.hasOne(Basket_All)
Basket_All.belongsTo(AutoPart)

Tiers.hasOne(History_All)
History_All.belongsTo(Tiers)

AutoPart.hasOne(History_All)
History_All.belongsTo(AutoPart)

Type.hasMany(AutoPart)
AutoPart.belongsTo(Type)

module.exports = {
    User,
    Connect,
    Basket,
    Feedback,
    Orders,
    OrderData,
    Favourite,
    Favourite_All,
    History,
    History_All,
    Basket_All,
    Tiers,
    Type,
    AutoPart,
    Delivery
}