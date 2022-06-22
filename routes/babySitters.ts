import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertbabySitterController } from '../controllers/upsert-babySitter';

const babySitter = Type.Object({
	id: Type.String({ format: 'uuid' }),
	name: Type.String(),
	phone: Type.String(),
});
type babySitter = Static<typeof babySitter>;

const GetbabySittersQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type  GetbabySittersQuery = Static<typeof GetbabySittersQuery>;

export let babySitters: babySitter[] = [
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Lamis', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', name: 'Lamis', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', name: 'Amani', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', name: 'Amani', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', name: 'Amal', phone: '0511111111' },
	{ id: '3', name: 'Azizah', phone: '123123123' },
];

export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/babySitters',
		schema: {
			summary: 'babySitters new babySitter + all properties are required',
			tags: ['babySitters'],
			body: babySitter,
		},
		handler: async (request, reply) => {
			const newbabySitter: any = request.body;
			return upsertbabySitterController(babySitters, newbabySitter);
		},
	});

	server.route({
		method: 'PATCH',
		url: '/babySitters/:id',
		schema: {
			summary: 'Update a babySitter by id + you dont need to pass all properties',
			tags: ['babySitters'],
			body: Type.Partial(babySitter),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newbabySitter: any = request.body;
			return upsertbabySitterController(babySitters, newbabySitter);
		},
	});

	server.route({
		method: 'DELETE',
		url: '/babySitters/:id',
		schema: {
			summary: 'Deletes a babySitter',
			tags: ['babySitters'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			babySitters = babySitters.filter((c) => c.id !== id);

			return babySitters;
		},
	});

	server.route({
		method: 'GET',
		url: '/babySitters/:id',
		schema: {
			summary: 'Returns one babySitter or null',
			tags: ['babySitters'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Union([babySitter, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return babySitters.find((c) => c.id === id) ?? null;
		},
	});

	server.route({
		method: 'GET',
		url: '/babySitters',
		schema: {
			summary: 'Gets all babySitters',
			tags: ['babySitters'],
			querystring: GetbabySittersQuery,
			response: {
				'2xx': Type.Array(babySitter),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetbabySittersQuery;

			if (query.name) {
				return babySitters.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return babySitters;
			}
		},
	});
}
