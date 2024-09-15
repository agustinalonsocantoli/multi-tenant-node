import { col, Includeable, ModelStatic, Op, where } from 'sequelize';
import { FindOptions, Model, WhereOptions } from 'sequelize';

class Query<T extends Model> {
    private model: ModelStatic<T>;;
    private options: FindOptions = {};

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    public exclude(fields: string[]): this {
        if (!this.options.attributes) this.options.attributes = { exclude: [] };

        if (Array.isArray(this.options.attributes)) {
            this.options.attributes = { exclude: fields };
        } else {
            this.options.attributes.exclude = fields;
        }

        return this;
    }

    public select(fields: string[]) {
        this.options.attributes = fields;
        return this;
    }

    public where(condition: WhereOptions): this {
        this.options.where = { ...(this.options.where || {}), ...condition };

        return this;
    }

    public whereILike(field: string, value: string): this {
        if (!this.options.where) this.options.where = {};

        this.options.where = where(col(field), { [Op.iLike]: value });

        return this;
    }

    public preload(include: Includeable): this {
        if (!this.options.include) {
            this.options.include = [];
        }

        this.options.include = include;
        return this;
    }

    public async first(): Promise<T | null> {
        return await this.model.findOne(this.options);
    }

    public async firstOrFail(): Promise<T> {
        const result = await this.first();
        if (!result) throw new Error('Record not found');
        return result;
    }

    public async findById(id: string | number): Promise<T | null> {
        return await this.model.findByPk(id, this.options);
    }

    public async exec(): Promise<T[]> {
        return await this.model.findAll(this.options);
    }
}

export default Query;