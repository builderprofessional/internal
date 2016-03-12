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
        Values ('one_time', NOW(), 'ESTIMATOR_EXPANDED_LICENSE_2', 'Estimator - 2 Extra User Licenses', 990000, 'Adds two new user licenses to your package.', 1);
    ");

    $this->execute("
      INSERT INTO billing_product (class_key, date_created, code, name, amount, description, position)
        Values ('one_time', NOW(), 'ESTIMATOR_EXPANDED_LICENSE_10', 'Estimator - 10 Extra User Licenses', 1990000, 'Adds ten new user licenses to your package.', 1);
    ");
  }
}
