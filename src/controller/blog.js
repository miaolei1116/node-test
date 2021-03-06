const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  // 定义 sql 语句
  let sql = `select * from blogs where 1=1 `; // 当 author 和 keyword 不传值的情况
  if (author) {
    sql += `and author = '${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += 'order by createtime desc;'
  
  // 返回 promise
  return exec(sql);
}

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  });
}

const newBlog = (blodData = {}) => {
  const { title, content, author } = blodData;
  const createtime = Date.now();
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createtime}, '${author}');
  `;
  return exec(sql).then(insertData => {
    console.log('insertData: ', insertData);
    return {
      id: insertData.insertId
    };
  });
}

const updateBlog = (blogData = {}) => {
  const { title, content, id } = blogData;
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id};
  `;
  return exec(sql).then(updateData => {
    console.log('updateData: ', updateData);
    if (updateData.affectedRows > 0) { // 当 mysql 更新成功会返回一串数据，来以此判断是否更新成功
      return true;
    }
    return false;
  });
}

const delBlog = (delData = {}) => {
  const { id, author } = delData;
  const sql = `
    delete from blogs where id=${id} and author='${author}';
  `;
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}