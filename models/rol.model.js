module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define("rol", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        isCrear: {
            type: Sequelize.BOOLEAN
        },
        isActualizar: {
            type: Sequelize.BOOLEAN
        },
        isBorrar: {
            type: Sequelize.BOOLEAN
        }
    });
    return Rol;
};