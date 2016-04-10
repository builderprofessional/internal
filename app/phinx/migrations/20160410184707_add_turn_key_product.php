<?php

use Phinx\Migration\AbstractMigration;

class AddTurnKeyProduct extends AbstractMigration
{
  /**
   * Change Method.
   *
   * Write your reversible migrations using this method.
   *
   * More information on writing migrations is available here:
   * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
   *
   * The following commands can be used in this method and Phinx will
   * automatically reverse them when rolling back:
   *
   *    createTable
   *    renameTable
   *    addColumn
   *    renameColumn
   *    addIndex
   *    addForeignKey
   *
   * Remember to call "create()" or "update()" and NOT "save()" when working
   * with the Table class.
   */
  public function change()
  {
    $this->execute("
      INSERT INTO billing_product (class_key, date_created, code, type_code, name, recurring_amount, one_time_amount, description, position)
        VALUES ('recurring', NOW(), 'TURNKEY_STANDARD', 'TURNKEY', 'Turn-Key Website', 1500000, 5000000, 'Turn-Key Website', 1);
    ");
  }
}
