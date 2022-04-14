const { MediumUser, MediumArticle, sequelize } = require('./models')
const stringify = require('../utils')

const userAndArticle = async () => {
  try {
    const data = await MediumUser.findAll({
      include: [{ model: MediumArticle, as: 'authored'}]
    })
    stringify(data)
  } catch (error) {
    console.log(error)
  }
}

const getArticleAuthors = async () => {
  try {
    const articles = await MediumArticle.findAll({
      include: [
        { model: MediumUser, as: 'author', attributes: ['id', 'username']}
      ]
    })
    stringify(articles)
  } catch (error) {
    console.log(error)
  }
}

const getReadingList = async () => {
  try {
    const list = await MediumUser.findAll({
      include: [
        {
          model: MediumArticle,
          as: "reading_list",
          through: { attributes: [] }
        }
      ]
    })
    stringify(list)
  } catch (error) {
    console.log(error)
  }
}

async function main() {
  try {
    // await userAndArticle()
    // await getArticleAuthors()
    await getReadingList()
  } catch (error) {
    console.log(error)
  } finally {
    sequelize.close()
  }
}

main()
