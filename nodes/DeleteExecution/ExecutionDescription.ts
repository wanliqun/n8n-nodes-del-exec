import type { INodeProperties } from 'n8n-workflow';

export const executionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'delete',
		displayOptions: {
			show: {
				resource: ['execution'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an execution',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/executions/{{ $execution.id }}',
					},
				},
			},
		],
	},
];
