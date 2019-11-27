const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    is_internal:{
        type:Boolean,
        required:true,
        default: true
    },
    is_active: {
        type:Boolean,
        default:true
    }, 
    is_deleted: {
        type:Boolean,
        default:false
    },
    target:{
        type:String,
        required:true,
        enum:['_blank' , '_self' , '_parent' , '_top']
    },
    link:{
        type:String, 
        required:true
    },
    added_by:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    updated_at :{
        type:Date,
    },
    updated_by : {
        type:Schema.Types.ObjectId,
        ref: 'users'
    }, 
    added_at : {
        type:Date,
        default:new Date()
    },
    deleted_at : {
        type:Date
    },
    deleted_by: {
        type:Schema.Types.ObjectId,
        ref: 'users'
    }
})

const menuSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    is_active : {
        type:Boolean,
        required:true,
        default:true
    },
    sub_menu: [ 
        {
            menu_item:{
                type:Schema.Types.ObjectId,
                ref:  'menu_item'  
            },
            is_active:{
                type:Boolean,
                default:true
            }  
        }]
    ,
    is_deleted: {
        type:Boolean,
        required:true,
        default:false
    },
    added_by:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    updated_at :{
        type:Date,
    },
    updated_by : {
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    added_at : {
        type:Date,
        default:new Date()
    },
    deleted_at : {
        type:Date
    },
    deleted_by: {
        type:Schema.Types.ObjectId,
        ref: 'users'
    }
})
const menuSch =  mongoose.model('menuSch',menuSchema );
const menu_item= mongoose.model('menu_item',menuItemSchema );
module.exports = {menuSch , menu_item};

