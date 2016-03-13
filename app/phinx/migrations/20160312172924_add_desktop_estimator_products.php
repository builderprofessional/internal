<?php

use Phinx\Migration\AbstractMigration;

class AddDesktopEstimatorProducts extends AbstractMigration
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
      INSERT INTO billing_product (class_key, date_created, code, name, amount, description, position)
        Values ('one_time', NOW(), 'ESTIMATOR_SILVER', 'Estimator - Silver Package', 3490000, 'Includes single user license and 30 days free phone support.', 1);
    ");

    $this->execute("
      INSERT INTO billing_product (class_key, date_created, code, name, amount, description, position)
        Values ('one_time', NOW(), 'ESTIMATOR_GOLD', 'Estimator - Gold Package', 4540000, 'Includes single user license and 1 year free phone support.', 1);
    ");

    $this->execute("
      INSERT INTO billing_product (class_key, date_created, code, name, amount, description, position)
        Values ('one_time', NOW(), 'ESTIMATOR_PLATINUM', 'Estimator - Platinum Package', 5590000, 'Includes three user licenses and 1 year free phone support.', 1);
    ");

    $this->execute("
      INSERT INTO billing_product (class_key, date_created, code, name, amount, description, position)
        Values ('one_time', NOW(), 'ESTIMATOR_EXTRA_LICENSE', 'Estimator - Extra User License', 490000, 'Adds a new user license to your package.', 1);
    ");
  }
}
