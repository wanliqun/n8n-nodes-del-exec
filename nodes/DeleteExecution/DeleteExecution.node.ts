import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
	NodeApiError,
	JsonObject,
	NodeOperationError,
} from 'n8n-workflow';

// DeleteExecution a custom n8n node used to delete the exeution under operation.
export class DeleteExecution implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Delete Execution',
		name: 'deleteExecution',
		icon: 'file:delexec.svg',
		group: [],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Delete execution after node is executed',
		defaults: {
			name: 'Delete Execution',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'n8nApi',
				required: true,
			},
		],
		requestDefaults: {
			returnFullResponse: true,
			baseURL: '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// resources
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Execution',
						value: 'execution',
					},
				],
				default: 'execution',
			},
			// operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'delete',
				options: [
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete an execution',
					},
				],
			},
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const executionId = this.getExecutionId();

    // Early validation for execution ID
    if (!executionId) {
      throw new NodeOperationError(this.getNode(), 'Execution ID is missing.');
    }

		// Custom interface for clarity
		type N8nApiCredentials = {
			apiKey: string;
			baseUrl: string;
		};

		const credentials = (await this.getCredentials('n8nApi')) as N8nApiCredentials;

		// Construct the request URL
    const deleteUrl = `${credentials.baseUrl}/executions/${executionId}`;

		// Prepare request options
    const options: IRequestOptions = {
      method: 'DELETE',
      url: deleteUrl,
    };

		try {
      // Perform the authenticated  n8n API request
      await this.helpers.requestWithAuthentication.call(this, 'n8nApi', options);

      // Assuming successful deletion, return empty output
      return this.prepareOutputData([]);

    } catch (error) {
      // Enhanced error handling for better diagnostics
      if (error instanceof NodeApiError) {
        // Rethrow original NodeApiError for known n8n errors
        throw error;
      } else {
        // For unexpected errors, provide more context
        throw new NodeApiError(this.getNode(), error as JsonObject, {
          message: `Error deleting execution: ${error.message}`,
        });
      }
    }
	}
}
