import db from "../../models/init.db";
const Pets = db.models.PETS;
const Images = db.models.PETS_IMG;
import { v4 as uuidv4 } from "uuid";
import sequelize from "sequelize";

export const findAll = async (_, res) => {
  try {
    const uuid = req.query.uuid;

    let condition = uuid ? { uuid } : null;

    let pets = await Pets.findAll({
      include: [{ model: Images, attributes: ["path"] }],
      where: condition,
      logging: console.log,
    });
    return res.send(pets);
  } catch (error) {
    return res.status(500).send({
      message: "[ERROR] Se produjo un error al recuperar Animales.",
    });
  }
};

export const findOne = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const pets = await Pets.findByPk(uuid);
    if (!pets)
      return res.status(500).send({
        message: `[ERROR] No se pudo encontrar un Animal con UUID = ${uuid}`,
      });
    return res.send(pets);
  } catch (error) {
    return res.status(500).send({
      message: `[ERROR] No se pudo encontrar el Animal`,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, first_name, last_name, username, email } = req.body;

    const user = await Users.update(
      { first_name, last_name, username, email },
      {
        where: { id },
      }
    );
    if (user == 1)
      res
        .status(200)
        .send({ message: `El usuario ${username} fue ACTUALIZADO con EXITO!` });
    else {
      res.status(400).send({
        message: `[ERROR] No se pudo actualizar el usuario con ID = ${id}`,
      });
    }
  } catch (error) {}
};

export const addPet = async (req, res) => {
  try {
    const {
      name,
      race,
      sex,
      castrated,
      address,
      user_uuid,
      date_lost,
      status,
    } = req.body;

    const pet = await Pets.create({
      uuid: `${uuidv4()}`,
      name: `${name}`,
      race: `${race}`,
      sex: `${sex}`,
      castrated: `${castrated}`,
      address: `${address}`,
      user_uuid: `${user_uuid}`,
      date_post: sequelize.fn("NOW"),
      date_lost: date_lost ? date_lost : null,
      status: `${status}`,
    });

    return res.status(201).send({
      message: `[EXITO] El Animal ${name} ha sido CREADO`,
    });
  } catch (error) {
    res.status(400).json({
      message: `[ERROR] ${error}`,
    });
  }
};
