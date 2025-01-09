const request = require("supertest");
const server = require("../index");


describe("Operaciones CRUD de cafes", () => {

    it("GET Cafe statusCode 200 return un arreglo con al menos 1 objeto", async()=>{
        const response=await request(server).get("/cafes").send();
        const status=response.statusCode;

        expect(status).toBe(200); // validar que la respuesta sea un 200
        expect(response.body).toBeInstanceOf(Array); // validar que  sea un arreglo
        expect(response.body.length).toBeGreaterThan(0); // validar que el arreglo tenga al menos 1 objeto
        expect(response.body[0]).toBeInstanceOf(Object); // validar que el primer elemento sea un objeto
        
    });

    it("Delete Cafe con ID que no existe y un Authorization y return un 404", async ()=>{
        const id=100;
        const token="bearer token_de_acceso";

        const response = await request(server).delete(`/cafes/${id}`).set(
            "Authorization",token
        );

        const status=response.statusCode;

        expect(status).toBe(404);
        
    });

    it("Post Cafe crear un registro de Cafe y return un 201", async ()=>{
        
        const cafe= {
            id:5,
            nombre:"Latte"
        };
        
        const response = await request(server).post(`/cafes`)
                                .send(cafe)
                                .set("Content-Type","application/json");

        const status=response.statusCode;

        expect(status).toBe(201);
        
    });

    it("PUT Cafe actualizar un registro de Cafe con diferente ID y return un 400", async ()=>{
        
        const cafe= {
            id:4,
            nombre:"Latte"
        };
        
        const response = await request(server).put(`/cafes/5`)
                                .send(cafe)
                                .set("Content-Type","application/json");

        const status=response.statusCode;

        expect(status).toBe(400);
        
    });
});
