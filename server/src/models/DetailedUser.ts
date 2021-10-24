import mongoose from 'mongoose';
import {DetailedUserModel} from "@pavo/shared-services-shared/src";

const UserSchema = new mongoose.Schema<DetailedUserModel> (
    {
        firstName: String,
        middleName: String,
        lastName: String,
        phone: Number,
        token: String,
        role: String,
        email: String
    }
)

UserSchema.statics.getUser = function (firstName) {
    this.find ({"firstName" : firstName}).then((user: DetailedUserModel) => {
        return user
    });
}

export const DetailedUser = mongoose.model('DetailedUser', UserSchema);
