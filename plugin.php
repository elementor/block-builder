<?php
namespace ElementorBlockBuilder;

use Elementor\User;
use ElementorBlockBuilder\Blocks;

/**
 * Class Plugin
 *
 * Main Plugin class
 */
class Plugin {
	/**
	 * Instance
	 *
	 * @access private
	 * @static
	 *
	 * @var Plugin The single instance of the class.
	 */
	private static $_instance = null;

	/**
	 * Blocks
	 * @access protected
	 * @var array of blocks
	 */
	protected $blocks = [];

	/**
	 * Instance
	 *
	 * Ensures only one instance of the class is loaded or can be loaded.
	 *
	 * @access public
	 *
	 * @return Plugin An instance of the class.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function add_block( $block ) {
		$this->blocks[ $block->get_name() ] = $block;
	}

	public function get_blocks( $block = null ) {
		if ( isset( $this->blocks[ $block ] ) ) {
			return $this->blocks[ $block ];
		}
		return $this->blocks;
	}

	/**
	 * widget_scripts
	 *
	 * Load required plugin core files.
	 * @access public
	 */
	public function widget_scripts() {
		wp_register_script( 'elementor-hello-world', plugins_url( '/assets/js/hello-world.js', __FILE__ ), [ 'jquery' ], false, true );
	}

	/**
	 * @param $template
	 *
	 * @access public
	 * @return string
	 */
	public function template_include( $template ) {
		if ( isset( $_REQUEST['elementor-block'] ) && User::is_current_user_can_edit() ) {
			add_filter( 'show_admin_bar', '__return_false' );
			return ELEMENTOR_PATH . 'modules/page-templates/templates/canvas.php';
		}

		return $template;
	}

	public function register_blocks() {
		include_once( BLOCK_BUILDER_PATH . '/blocks/template-block.php' );
		$this->add_block( new Blocks\Template_Block() );
	}


	/**
	 *  Plugin class constructor
	 *
	 * Register plugin action hooks and filters
	 *
	 * @access public
	 */
	public function __construct() {
		add_filter( 'template_include', [ $this, 'template_include' ], 12 /* After WooCommerce & Elementor Pro - Locations Manager */ );
		add_action( 'init', [ $this, 'register_blocks' ] );
	}
}
// Instantiate Plugin Class
Plugin::instance();
