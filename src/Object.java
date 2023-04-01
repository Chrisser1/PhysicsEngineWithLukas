import java.util.ArrayList;

import processing.core.PGraphics;

/**
 * Objekt
 */
public abstract class Object {
  protected final Vector[] pos;

  protected int radius;
  
  protected Vector velocity;
  protected Vector force;
  protected Vector acceleratuion;

  public final int mass = 10;
  protected int color;
  public boolean isStatic = true;

  ArrayList<Addons> addons = new ArrayList<Addons>();

  public Object(Vector[] pos, Addons[] addons, int color) {
    this.pos = pos;
      velocity = new Vector(0f, 0f);
      acceleratuion = new Vector(0f,0f);
      force = new Vector(0f,0f);

      for(int i = 0; i < addons.length; i++) {
        if(addons[i] instanceof Collision) isStatic = false;
        this.addons.add(addons[i]);
        this.addons.get(i).setup(this);
      }
  }
  
  public void tick(Object[] objects) {
    updatePos();
    updateAddons(objects);
  };
  
  // Our current method of updating the posistion of an object
  protected void updatePos() {
      velocity.add(acceleratuion);
    float Xratio =  velocity.getX() / velocity.length();
    float Yratio =  velocity.getY() / velocity.length();
    for(int i = 0; i < velocity.length(); i++) {
      addPos(new Vector(Xratio,Yratio));
      for(Addons addon: addons) {
        addon.updatePos(this);
      }
    }

      force = new Vector(velocity.getX()*mass,velocity.getY()*mass);
      // addPos(velocity);
      // System.out.println(pos[0].getCoords());
  }

  protected void updateAddons(Object[] objects) {
    for(Addons addon: addons) {
      addon.tick(this,objects);
    }
  }

  public int getRadius() {
      return radius;
  }

  public void addPos(float x, float y) {
    for(int i = 0; i < pos.length; i++) {
      pos[i].add(new Vector(x, y));
    }
  }

  public void addPos(Vector vec) {
    for(int i = 0; i < pos.length; i++) {
      pos[i].add(new Vector(vec));
    }
  }

  public abstract void draw(PGraphics g);
}