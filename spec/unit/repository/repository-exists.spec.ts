import '../helpers/mock-client';

import { Client } from '$lib/client';
import { Repository } from '$lib/repository';
import { Schema } from '$lib/schema';

const simpleSchema = new Schema('SimpleEntity', {}, { dataStructure: 'HASH' });

describe('Repository', () => {
  describe('#exists', () => {
    let client: Client;
    let repository: Repository;

    beforeAll(() => {
      client = new Client();
    });
    beforeEach(() => {
      repository = new Repository(simpleSchema, client);
    });

    it('checks existence of a single entity', async () => {
      await repository.exists('foo');
      expect(client.exists).toHaveBeenCalledWith('SimpleEntity:foo');
    });

    it('checks existence of multiple entities', async () => {
      await repository.exists(['foo', 'bar', 'baz']);
      expect(client.exists).toHaveBeenCalledWith('SimpleEntity:foo', 'SimpleEntity:bar', 'SimpleEntity:baz');
    });

    it('removes duplicate keys prior to checking for existence of entities', async () => {
      await repository.exists(['foo', 'bar', 'baz', 'bar']);
      expect(client.exists).toHaveBeenCalledWith('SimpleEntity:foo', 'SimpleEntity:bar', 'SimpleEntity:baz');
    });

  });
});
