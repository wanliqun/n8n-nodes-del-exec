import {
	IAuthenticate,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IDataObject,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class DeleteExecutionCredentialApi implements ICredentialType {
	name: string;
	displayName: string;
	icon?: string | undefined;
	iconUrl?: string | undefined;
	extends?: string[] | undefined;
	properties: INodeProperties[];
	documentationUrl?: string | undefined;
	__overwrittenProperties?: string[] | undefined;
	authenticate?: IAuthenticate | undefined;
	preAuthentication?: ((this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) => Promise<IDataObject>) | undefined;
	test?: ICredentialTestRequest | undefined;
	genericAuth?: boolean | undefined;
	httpRequestNode?: ({ name: string; docsUrl: string; } & ({ apiBaseUrl: string; } | { apiBaseUrlPlaceholder: string; })) | undefined;

	constructor(name: string, displayName: string, properties: INodeProperties[]) {
		this.name = name
		this.displayName = displayName
		this.properties = properties
	}
}
