const server = {
	server_ip: 'http://localhost',
	server_port: '8000',
};
export const endpoints = {
	authors: `${server.server_ip}:${server.server_port}/api/authors`,
	books: `${server.server_ip}:${server.server_port}/api/books`,
	login: `${server.server_ip}:${server.server_port}/api/`,
};
