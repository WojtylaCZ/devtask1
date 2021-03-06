import { ApiError } from '../../../common/api/errors/ApiError';
import NonLexicalWordSchema from '../models/NonLexicalWordSchema';
import { lexicalComplexity } from '../resolvers';

describe('complexity data', () => {
  beforeEach(() => {
    jest.spyOn(NonLexicalWordSchema, 'find').mockReturnValueOnce(Promise.resolve([]) as any);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns overall_lq for valid text', async () => {
    expect.assertions(2);

    const text = 'lorem ipsum';
    const result = await lexicalComplexity({ text }, {});

    expect(result!.data!.overall_ld).toBeDefined();
    expect(result!.data!.sentence_ld).toBeUndefined();
  });

  it('returns overall_lq and sentence_ld for valid text with verbose', async () => {
    expect.assertions(2);

    const text = 'lorem ipsum';
    const result = await lexicalComplexity({ text }, { mode: 'verbose' });

    expect(result!.data!.overall_ld).toBeDefined();
    expect(result!.data!.sentence_ld).toBeDefined();
  });

  it('returns overall_lq and sentence_ld for valid text with verbose', async () => {
    expect.assertions(2);

    const text = 'lorem ipsum. lorem ipsum';
    const result = await lexicalComplexity({ text }, { mode: 'verbose' });

    expect(result!.data!.overall_ld).toBeDefined();
    expect(result!.data!.sentence_ld).toBeDefined();
  });

  it('throws ApiError if word count in text > 100', async () => {
    expect.assertions(1);

    const text =
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' +
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' +
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' +
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' +
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' +
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' +
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' +
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ';
    await expect(lexicalComplexity({ text }, { mode: 'verbose' })).rejects.toThrowError(ApiError);
  });
});

describe('complexity alg', () => {
  beforeEach(() => {
    jest
      .spyOn(NonLexicalWordSchema, 'find')
      .mockReturnValueOnce(Promise.resolve([{ value: 'is' }, { value: 'a' }]) as any);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns correct values for sentences', async () => {
    expect.assertions(2);

    const text = 'lorem (is a) 123 ipsum. lorem 12 , * (a) ipsum';

    const result = await lexicalComplexity({ text }, { mode: 'verbose' });

    expect(result!.data!.overall_ld).toEqual(0.57);
    expect(result!.data!.sentence_ld).toEqual([0.5, 0.67]);
  });
});
