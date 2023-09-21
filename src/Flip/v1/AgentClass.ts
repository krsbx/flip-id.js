import axios from '../../axios/v1';
import type Flip from '../..';
import BaseV1Class from './BaseClass';
import {
  AgentIdentityImagePayload,
  SupportingDocument,
  SupportingDocumentPayload,
} from '../../utils/type/v1';
import {
  uploadIdentityImageRequest,
  uploadSupportingDocumentRequest,
} from '../../generator/agent/v1';
import { normalizeSupportingDocument } from '../../utils/normalizer/agent';

class AgentClass extends BaseV1Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public get upload() {
    const { baseUrl } = this;

    return {
      async identityImage(agentId: string, payload: AgentIdentityImagePayload) {
        const { data } = await axios.put<{ image_url: string }>(
          `${baseUrl}/users/${agentId}/identities`,
          uploadIdentityImageRequest(payload)
        );

        return {
          imageUrl: data.image_url,
        };
      },
      async supportingDocument(
        agentId: string,
        payload: SupportingDocumentPayload
      ) {
        const { data } = await axios.put<SupportingDocument[]>(
          `${baseUrl}/users/${agentId}/identities`,
          uploadSupportingDocumentRequest(agentId, payload)
        );

        return normalizeSupportingDocument(data);
      },
    };
  }

  public get kyc() {
    const { baseUrl } = this;

    return {
      async submit(agentId: string) {
        const { data } = await axios.put<{ message: string }>(
          `${baseUrl}/users/${agentId}/submit`,
          {
            user_type: 1,
          }
        );

        return data;
      },
    };
  }
}

export = AgentClass;
