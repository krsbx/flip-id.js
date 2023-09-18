import axios from '../../axios';
import type Flip from '../..';
import {
  AgentIdentity,
  AgentIdentityPayload,
  AgentIdentityById,
} from '../../utils/type';
import { createAgentIdentityRequest } from '../../generator/agent/v2';
import {
  normalizeAgentIdentity,
  normalizeAgentIdentityById,
} from '../../utils/normalizer/agent';

class AgentClass {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  get #baseUrl() {
    if (this.#flip.toSendBox) {
      return 'big_sandbox_api/v2';
    }

    return 'api/v2';
  }

  async create(payload: AgentIdentityPayload) {
    const { data } = await axios.post<AgentIdentity>(
      `${this.#baseUrl}/agents`,
      createAgentIdentityRequest(payload)
    );

    return normalizeAgentIdentity(data);
  }

  async update(agentId: string, payload: AgentIdentityPayload) {
    const { data } = await axios.put<AgentIdentity>(
      `${this.#baseUrl}/agents/${agentId}`,
      createAgentIdentityRequest(payload)
    );

    return normalizeAgentIdentity(data);
  }

  get get() {
    const baseUrl = this.#baseUrl;

    return {
      async byId(agentId: string) {
        const { data } = await axios.get<AgentIdentityById>(
          `${baseUrl}/agents/${agentId}`
        );

        return normalizeAgentIdentityById(data);
      },
    };
  }
}

export = AgentClass;
