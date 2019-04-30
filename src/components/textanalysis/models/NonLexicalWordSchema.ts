import { Document, model, Schema } from 'mongoose';

const NonLexicalWordSchema = new Schema({
  value: { type: String, required: true, unique: true }
});

export interface INonLexicalWordSchema extends Document {
  value: string;
}

export default model<INonLexicalWordSchema>('NonLexicalWordSchema', NonLexicalWordSchema, 'nonlexicalwords');
