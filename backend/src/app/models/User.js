const { default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: { type: String, unique: true },
        password: String,
        name: { type: String, unique: false },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugin
mongoose.plugin(slug);
UserSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

// Middleware to set the `name` field before saving
UserSchema.pre('save', function (next) {
    this.name = `${this.firstName} ${this.lastName}`;
    next();
});

module.exports = mongoose.model('User', UserSchema);
