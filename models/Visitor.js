var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Visitor Model
 * ==========
 */
var Visitor = new keystone.List('Visitor');

Visitor.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Visitor.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Visitor.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Visitor.defaultColumns = 'name, email, isAdmin';
Visitor.register();
