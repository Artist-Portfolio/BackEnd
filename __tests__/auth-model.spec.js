const db = require('../data/dbConfig');
const Users = require('../auth/auth-model');

describe('users model', () => {
    describe('users add()', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('should add 2 users', async () => {
            await Users.add({username: 'theguy', password: 'hyperdrive65', email: "guy@gmail.com"});
            await Users.add({username: 'anotherguy', password: 'schismparabola', email: "anotherguy@gmail.com"});

            const users = await db('users');
            expect(users).toHaveLength(2);
        })
    })
   
    describe('users findById', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('should return the id of a user', async () => {
            await Users.add({username: 'theguy', password: 'hyperdrive65', email: "guy@gmail.com"});
            const user = await Users.findById(1);
            expect(user.id).toBe(1);
        })
    })

    describe('users findby', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should return user by username', async () => {
            await Users.add({username: 'anotherguy', password: 'schismparabola', email: "anotherguy@gmail.com"});
            const returnedUsername = await Users.findBy({username: "anotherguy"}).first();

            expect(returnedUsername.username).toBe("anotherguy");
        })

        it('should return user by email', async () => {
            await Users.add({username: 'anotherguy', password: 'schismparabola', email: "anotherguy@gmail.com"});
            const returnedEmail = await Users.findBy({email: "anotherguy@gmail.com"}).first();

            expect(returnedEmail.email).toBe("anotherguy@gmail.com");
        })
    })
})