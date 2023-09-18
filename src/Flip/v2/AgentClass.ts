import axios from '../../axios';
import type Flip from '../..';
import {
  AgentIdentity,
  AgentIdentityPayload,
  AgentIdentityById,
} from '../../utils/type/v2';
import { createAgentIdentityRequest } from '../../generator/agent/v2';
import {
  normalizeAgentIdentity,
  normalizeAgentIdentityById,
} from '../../utils/normalizer/agent';
import BaseV2Class from './BaseClass';

class AgentClass extends BaseV2Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public get identity() {
    const { baseUrl } = this;

    return {
      async create(payload: AgentIdentityPayload) {
        const { data } = await axios.post<AgentIdentity>(
          `${baseUrl}/agents`,
          createAgentIdentityRequest(payload)
        );

        return normalizeAgentIdentity(data);
      },

      async update(agentId: number, payload: AgentIdentityPayload) {
        const { data } = await axios.put<AgentIdentity>(
          `${baseUrl}/agents/${agentId}`,
          createAgentIdentityRequest(payload)
        );

        return normalizeAgentIdentity(data);
      },

      get get() {
        return {
          async byId(agentId: number) {
            const { data } = await axios.get<AgentIdentityById>(
              `${baseUrl}/agents/${agentId}`
            );

            return normalizeAgentIdentityById(data);
          },
        };
      },
    };
  }
}

export = AgentClass;
