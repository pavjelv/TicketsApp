import {Schema, model} from "mongoose"
import {DetailedUserModel} from "@pavo/shared-services-shared/src";

const UserSchema = new Schema<DetailedUserModel> (
    {
        firstName: String,
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

export const DetailedUserRepository = model('DetailedUser', UserSchema);
