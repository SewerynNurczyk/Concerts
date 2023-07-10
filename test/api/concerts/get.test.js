const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {
        const testConOne = new Concert(
            {
                performer: 'John Do',
                genre: 'Rock',
                price: 25,
                day: 1
            });
        await testConOne.save();

        const testConTwo = new Concert(
            {
                performer: 'Maybell Haley',
                genre: 'Pop',
                price: 40,
                day: 2
            });
        await testConTwo.save();

        const testConThree = new Concert(
            {
                performer: 'Rebekasz Parkersz',
                genre: 'RTC',
                price: 30,
                day: 3
            });
        await testConThree.save();

        const testConFour = new Concert(
            {
                performer: 'John Do',
                genre: 'Pop',
                price: 20,
                day: 1
            });
        await testConFour.save();

        const testConFive = new Concert(
            {
                performer: 'Maybell Haley',
                genre: 'Rock',
                price: 10,
                day: 1
            });
        await testConFive.save();
    });

    after(async () => {
        await Concert.deleteMany();
    });

    it('/:performer should return all concerts with the same performer', async () => {

        const res = await request(server).get('/api/concerts/performer/John Do');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body).to.not.be.null;
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].performer).to.be.equal('John Do');

    });

    it('/:genre should return all concerts with the same genre', async () => {

        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body).to.not.be.null;
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].genre).to.be.equal('Pop');

    });

    it('/:day should return all concerts with the same day', async () => {

        const res = await request(server).get('/api/concerts/price/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
        expect(res.body).to.not.be.null;
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].day).to.be.equal(1);

    });

    it('/:price_min/:price_max should return all concerts between price_min and price_max range', async () => {

        const res = await request(server).get('/api/concerts/price/20/35');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
        expect(res.body).to.not.be.null;
        expect(res.body[0]).to.be.an('object');

    });

});