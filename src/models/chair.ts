import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database/mysql'

interface ProductProps extends Model {
    id: number;
    chair_name: string;
    color_name: string;
    url: string;
}

export const Product = sequelize.define<ProductProps>("Product", {
    chair_name: {
        type: DataTypes.INTEGER
    },
    color_name: {
        type: DataTypes.INTEGER
    },
    url: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'product',
    timestamps: false
})