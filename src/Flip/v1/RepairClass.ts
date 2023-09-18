import axios from '../../axios/v1';
import type Flip from '../..';
import BaseV1Class from './BaseClass';
import { RepairDataPayload } from '../../utils/type/v1';
import { AgentIdentity } from '../../utils/type/v2';
import { normalizeAgentIdentity } from '../../utils/normalizer/agent';
import { repairAgentIdentityRequest } from '../../generator/agent/v1';

async function repairImage(endPoint: string, payload: Blob) {
  const formData = new FormData();
  formData.append('image', payload);
  formData.append('user_type', '1');

  const { data } = await axios.put<{ image_url: string }>(endPoint, formData);

  return {
    imageUrl: data.image_url,
  };
}

class RepairClass extends BaseV1Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public get agent() {
    const { baseUrl } = this;

    return {
      async data(agentId: number, payload: RepairDataPayload) {
        const { data } = await axios.put<AgentIdentity>(
          `${baseUrl}/users/${agentId}/repair`,
          repairAgentIdentityRequest(payload)
        );

        return normalizeAgentIdentity(data);
      },

      async identityImage(agentId: number, payload: Blob) {
        return repairImage(`${baseUrl}/users/${agentId}/repairPhoto`, payload);
      },

      async identitySelfieImage(agentId: number, payload: Blob) {
        return repairImage(`${baseUrl}/users/${agentId}/repairSelfie`, payload);
      },
    };
  }
}

export = RepairClass;
