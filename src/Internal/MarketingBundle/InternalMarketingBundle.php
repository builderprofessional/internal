<?php
namespace Internal\MarketingBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class InternalMarketingBundle extends Bundle
{
  /**
   * this will allow the reverse command to tell which tables belong to this bundle
   */
  public static $defaultTablePrefix = 'marketing';

  /**
   * this will define which bundle tables without prefixes should get added to
   */
  public static $defaultBundle = false;
}
