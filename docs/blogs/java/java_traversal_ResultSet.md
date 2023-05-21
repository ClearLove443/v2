---
title: "Java将ResultSet结果集遍历到List中"
date: "2021-09-25 21:27:19"
tag: [java, jdbc, ResultSet, hive]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

在正常情况下，我们是不能直接将 ResultSet 记录集 rs 直接传递给前台的，因为 ResultSet 不仅无法进行循环遍历 （即只能每行遍历，从 0 至 end ，执行一次），而且在实际应用中，它还必须被关闭。当关闭后，rs 为 null ,结果不再存在。
在这时我们就需要将 ResultSet 对象进行遍历到 list 中。

以 java 连接 hive 为例

```java
    /**
     * jdbc 连接 hive
     *
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    private static List<Map<String, Object>> connectToHive() throws ClassNotFoundException, SQLException {
        String url = "jdbc:hive2://110.40.137.191:10000/testdb";
        String driver = "org.apache.hive.jdbc.HiveDriver";
        String username = "";
        String password = "";
        String sql = "select * from employee";
        Connection connection = null;
        Class.forName(driver);
        connection = DriverManager.getConnection(url, username, password);
        // Statement statement = connection.createStatement();
        // ResultSet resultSet = statement.executeQuery(sql);

        PreparedStatement pstmt = connection.prepareStatement(sql);
        // pstmt.setInt(1, 1);
        // pstmt.setString(2, "2");
        // 将ResultSet结果集遍历到List中
        ResultSet resultSet = pstmt.executeQuery();
        List<Map<String, Object>> resultList = convertList(resultSet);
        resultSet.close();
        pstmt.close();
        connection.close();
        return resultList;
    }

    /**
     * 将ResultSet结果集遍历到List中
     *
     * @param rs
     * @return
     * @throws SQLException
     */
    private static List<Map<String, Object>> convertList(ResultSet rs) throws SQLException {
        List<Map<String, Object>> list = new ArrayList<>();
        ResultSetMetaData md = rs.getMetaData();// 获取键名
        int columnCount = md.getColumnCount();// 获取行的数量
        while (rs.next()) {
            Map<String, Object> rowData = new HashMap<>();// 声明Map
            for (int i = 1; i <= columnCount; i++) {
                rowData.put(md.getColumnName(i), rs.getObject(i));// 获取键名及值
            }
            list.add(rowData);
        }
        return list;
    }
```
